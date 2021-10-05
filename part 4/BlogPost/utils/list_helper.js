const dummy = (blogs) => {
  return 1;
}
const totalLikes = (blogs) => {
  const sum = blogs.reduce((favourite, blog)=>{
  	return favourite + blog.likes
  	 },0)
  return sum;
};


module.exports = {
  dummy,
  totalLikes
};