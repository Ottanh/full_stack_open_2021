const { ApolloServer, UserInputError } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const http = require('http')

const typeDefs = require('./typedefs')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  const JWT_SECRET = process.env.SECRET


const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const genres = args.genre ? { genres: { $in: args.genre} } : null
      try {
        return await Book.find(genres)
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    allAuthors: async () => {
      const Authors =  await Author.find({})
      const books = await Book.find({})
      return Authors.map(author => {
        return {
          name: author.name,
          born: author.born,
          id: author.id,
          bookCount: books.reduce((a, book) => (book.author.equals(author._id) ? a + 1 : a), 0),
        }
      })
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },
  Book: {
    author: async (root) => {
      return (await root.populate('author', { name: 1 })).author
  }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }

      let author = await Author.findOne({name: args.author})
      if(!author){
        author = new Author({name: args.author})
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args.author
          })
        }
      }

      const book = new Book({...args, author})
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book

    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }

      const author = await Author.findOne({ name: args.name })
      if(author) {
        try {
        author.born = args.setBornTo
        return await author.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args.setBornTo
          })
        }
      } else {
        return null
      }

    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {    
    bookAdded: {      
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])    
    },  
  },
}


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionServer = SubscriptionServer.create(    
    {      
      schema,     
      execute,      
      subscribe,    
    },    
    {      
      server: httpServer,      
      path: '',    
    }  
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {    
      const auth = req ? req.headers.authorization : null   
      if (auth && auth.toLowerCase().startsWith('bearer ')) {      
        const decodedToken = jwt.verify(        
          auth.substring(7), JWT_SECRET      
        )      
        const currentUser = await User        
          .findById(decodedToken.id)     
        return { currentUser }    
      }  
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {        
        async serverWillStart() {          
          return {            
            async drainServer() {              
              subscriptionServer.close()            
            },          
          }        
        },      
      },    
    ]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )

}

start()


