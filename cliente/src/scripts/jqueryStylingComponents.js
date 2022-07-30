import $ from 'jquery'

const setSize =(id,width,height)=>{
  if(width) $("#"+id).width(width);
  if(height) $("#"+id).height(height);
}
const setBackground =(id,color)=>{
    $("#"+id).css("background-color", color);
}
const setMultiCss =(id, arr_css_propertys, arr_css_values)=>{
    let count = 0
    arr_css_propertys.forEach(property => {
        $("#"+id).css(property,arr_css_values[count]);
        count++; 
    });
}
export {setSize,setBackground,setMultiCss}