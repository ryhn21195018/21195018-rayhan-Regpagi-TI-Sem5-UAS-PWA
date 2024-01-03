var db;
var request = indexedDB.open('komentarDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("nama", "nama", { unique: true });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("message", "message", { unique: true });

};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('komentar-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { nama: nama, email: email, message: message };
    objectStore.add(comment);

    document.getElementById('nama').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    transaction.oncomplete = function() {
        alert("Komentar telah disimpan.");
        //document.getElementById("komentar-Form").reset();
        // tampilkanKomentar();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
};
    // showComments();
});