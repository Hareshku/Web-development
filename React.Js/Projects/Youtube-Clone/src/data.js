export const API_KEY ="AIzaSyBwH98ejn8gdt6HnT8OHfpOyobsvkKyJsg";

export const value_Converter=(value)=>{
  if(value>=1000000){
    return Math.floor(value/1000000)+"M"
  }
  else if(value>=1000){
    return Math.floor(value/1000)+"K"
  }
  else{
    return value;
  }
}