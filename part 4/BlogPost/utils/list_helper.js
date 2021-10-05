const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => (sum += blog.likes));
  return sum;
};

const favoriteBlog = (blogs) =>{
  let favorite= 0;
   blogs.map(blog=>{
       if(blog.likes > favorite){
           favorite = blog.likes
       }
   })

  // return sum
  
  let result = blogs.filter(obj => {
      return obj.likes === favorite
    })
  const { _id, url, __v , ...answer} = result[0]
  return answer
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};