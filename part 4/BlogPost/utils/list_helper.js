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

const mostBlogs = (blogs) => {
  const usersObj = blogs.reduce((obj, blog) => {
    if (blog.author in obj) {
      obj[blog.author] += 1;
    } else {
      obj[blog.author] = 1;
    }
    return obj;
  }, {});
  let k = Object.keys(usersObj).reduce((a, b) =>
    usersObj[a] > usersObj[b] ? a : b
  );
 
let author = new Object;
author.author = k
author.blogs =  usersObj[k]
  return author;
};

const mostLikes = (blogs) => {
  const usersObj = blogs.reduce((obj, blog) => {
    if (blog.author in obj) {
      obj[blog.author] += blog.likes;
    } else {
      obj[blog.author] = blog.likes;
    }
    return obj;
  }, {});
  let k = Object.keys(usersObj).reduce((a, b) =>
    usersObj[a] > usersObj[b] ? a : b
  );
  let author = new Object();
  author.author = k;
  author.likes = usersObj[k];
  return author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};