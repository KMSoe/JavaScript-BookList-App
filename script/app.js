//Book Class: Represent a book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
    
}

//UI Class: Handle UI Tasks
class UI{
    static bookList=document.querySelector('#bookList');
    static form=document.querySelector('#form');
    static title=document.querySelector('#title');
    static author=document.querySelector('#author');
    static isbn=document.querySelector('#isbn');
    

    static displayBooks(books){
        books.forEach(book => {
            UI.addBook(book);
        });
    }
    static addBook(book){
        const row=document.createElement('tr');
        row.innerHTML= `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><i class="fa fa-trash delete text-danger" aria-hidden="true"></i></td>
                        `;
        UI.bookList.appendChild(row);
    }
    static removeBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
        
    }
    static clearFields(){
        this.title.value='';
        this.author.value='';
        this.isbn.value='';
    }
    static showAlert(className,message){

    }
}

//Store Class: Handle Storage
class Store{
    static getBooks(){
        let bookList;
        const data=localStorage.getItem('books');
        if(data){
            bookList=JSON.parse(data);
        }else{
            bookList=[];
        }
        return bookList;
    }
    static storeBook(book){
        const bookList=Store.getBooks();
        bookList.push(book);
        localStorage.setItem('books',JSON.stringify(bookList));
    }
    static deleteBook(isbn){
        
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    UI.displayBooks(Store.getBooks());
});



//Event: Add a Book
UI.form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=UI.title.value;
    const author=UI.author.value;
    const isbn=UI.isbn.value;

    if(title==='' && author==='' && isbn===''){

    }else{
        const book=new Book(UI.title.value,UI.author.value,UI.isbn.value);

        UI.addBook(book);

        Store.storeBook(book);

        UI.clearFields();
    }
    
});

//Event: Remove a Book
UI.bookList.addEventListener('click',(e)=>{
    e.preventDefault();
    const element=e.target;
    console.log(element);
    UI.removeBook(element);

});