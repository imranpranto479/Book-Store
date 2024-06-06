import express from "express"
import { Book } from "../models/bookModel.js";

const router = express.Router()



//route to save book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all thr required fields title, author and publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);
      response.status(201).send(book);
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  });
  
  //route to get all books
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).send({
        count: books?.length,
        data: books,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send(error?.message);
    }
  });
  
  //route to get one book
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Update a Book
  router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  
    //route delete one book
  router.delete("/:id", async (request, response) => {
      try {
        const { id } = request?.params;
    
        const result = await Book.findByIdAndDelete(id);
        if(!result){
        return response.status(404).send({
          message:"book not found"
        });
     
      }
      return response.status(200).send({
          message:"book deleted"
        });
      } catch (error) {
        //console.log(error);
        response.status(500).send(error?.message);
      }
    });
  
export default router