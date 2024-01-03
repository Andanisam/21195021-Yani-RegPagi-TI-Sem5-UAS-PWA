// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('portofolio', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", {unique: false});
    objectStore.createIndex("deskripsi", "deskripsi", {unique: false});
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('contact__form').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var deskripsi = document.getElementById('deskripsi').value;
    

    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { name: name, email : email, deskripsi : deskripsi };
    objectStore.add(comment);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('deskripsi').value = '';
   

    transaction.oncomplete = function() {
        alert("Komentar telah disimpan.");
        document.getElementById("contact__form").reset();
        // tampilkanKomentar();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
     };

});

