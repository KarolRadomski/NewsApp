const asyncHandler = require("express-async-handler")
const News = require("../models/newsModel")

// @desc    Get news
// @route   GET /api/news
// @access  Public
const getNews = asyncHandler(async(req,res)=>{
   const news = await News.find();
   res.json(news)
})

// @desc    Set news
// @route   POST /api/news
// @access  Private
const setNews = asyncHandler(async(req,res)=>{
   if(!req.body.title || !req.body.description){
      res.status(400)
      throw new Error('Missing data')
   }
   const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      category: req.body.category
   })
   res.json(news)
})

// @desc    Update news
// @route   PUT /api/news
// @access  Private
const updateNews = asyncHandler(async(req,res)=>{
   const news = await News.findById(req.params.id)
   if(!news){
      res.status(400)
      throw new Error('News not found')
   }
   else if(!req.body.title && !req.body.description && !req.body.img && !req.body.category){
      res.status(400)
      throw new Error('Nothing to update')
   }
   else if(!req.params.id){
      res.status(400)
      throw new Error("Please select article to update")
   }
   const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new : true })

   res.json(updatedNews)
})

// @desc    Delete news
// @route   DELETE /api/news
// @access  Private
const deleteNews = asyncHandler(async(req,res)=>{
   const news = await News.findById(req.params.id)
   if(!news){
      res.status(400)
      throw new Error("News not found")
   }
   const deletedNews = await News.findByIdAndDelete(req.params.id)

   res.json(deletedNews)
})


module.exports = {getNews, setNews, updateNews, deleteNews}