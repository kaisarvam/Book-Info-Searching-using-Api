const searchText = document.getElementById('book-search');
const searchBtn = document.getElementById('search-addon');
const searchResultCount = document.getElementById('search-result-count');
const booksDiv = document.getElementById('books-div');
const loader =   document.getElementById('preloader');

// =================== Fatching data from API =====================
 searchNow = async (Text)=>{
     if(Text.trim()===""){
         alert("Please enter a book name to Search")
         searchText.value="";
     }
     else{
    loader.classList.remove('d-none');
   await fetch(`https://openlibrary.org/search.json?q=${Text}`)
  .then(response => response.json())
  .then(data => {
      displaySearch(data);
  });
}
  loader.classList.add('d-none');
}

//  ==================== data validation  codes ==========================
titleCheck = (f)=>{
    if(f.title===undefined){
        return "Not Available ";
    }
    else{
        return f.title;
    }
}

imgCheck = (f)=>{
    if(f.cover_i===undefined){
    return "./img/noPreview-L.jpg";
    }
    else{
        return `https://covers.openlibrary.org/b/id/${f.cover_i}-L.jpg`;
    }
}

publishDateCheck = (f)=>{
    if(f.publish_date===undefined){
        return "Not Available ";
    }
    else{
        return f.publish_date[0];
    }
}

publishercheck=(f)=>{
    if(f.publisher===undefined){
        return "Not Available ";
    }
    else{
        return f.publisher[0];
    }
}

authorCheck = (f)=>{
    if(f.author_name===undefined){
        return "Not Available ";
    }
    else{
        return f.author_name[0];
    }
}


// =================  Data loading to Front End ==============

 displaySearch = (data)=>{
    
        searchResultCount.innerHTML = `<h3> Total ${ data.numFound === 0 ? "NO" : data.numFound} Result found  for " ${searchText.value} "</h3>`  
  searchText.value="";
  booksDiv.innerHTML="";

  if(data.numFound!==0){
     const allbooks = data.docs;
     const BooksFinal = allbooks.slice(0, 25)
      BooksFinal.forEach(e => {  
          const Books = document.createElement('div');
          Books.classList.add('card','m-4','col-md-3','p-1','m-1','shadow-lg');
          
          Books.innerHTML = `
                <img src="${imgCheck(e)}" alt="Image not found in server" class="card-img-top img-fluid image-style">
                <h4 class="card-title  m-0 text-color text-center" >${titleCheck(e)}</h4>
                <div class="card-body text-center m-0">
                <p class="card-title text-left" > <span class="author"> Author  : </span> ${authorCheck(e)} </p>
                <p class="card-title text-left" > <span class="publisher"> Publisher :</span> ${publishercheck(e)} </p>
                <p class="text-muted p-3"> <span class="publisher"> First published : </span> ${publishDateCheck(e)}  </p>
                </div>
          `
          booksDiv.appendChild(Books);
          
      });
  }
  


 }