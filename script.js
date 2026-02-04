// Mengambil elemen canvas dan tombol
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const calculateBtn = document.getElementById('calculateBtn');

// Konfigurasi Canvas
const width = canvas.width;
const height = canvas.height;
// Skala: 1 unit matematika = 20 pixel canvas
const scale = 20; 
const centerX = width / 2;
const centerY = height / 2;

// Fungsi menggambar grid/sumbu
function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw Axes
    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // Sumbu X
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    
    // Sumbu Y
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Angka Sederhana
    ctx.font = "10px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText("0", centerX + 2, centerY + 12);
    ctx.fillText("X", width - 15, centerY - 5);
    ctx.fillText("Y", centerX + 5, 15);
}

// Fungsi Utama: Hitung dan Gambar
function updateGraph() {
    // 1. Ambil Nilai dari Input
    const a = parseFloat(document.getElementById('inputA').value) || 0;
    const b = parseFloat(document.getElementById('inputB').value) || 0;
    const r = parseFloat(document.getElementById('inputR').value) || 1;

    // 2. Update Teks Persamaan
    const signA = a >= 0 ? `- ${a}` : `+ ${Math.abs(a)}`;
    const signB = b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`;
    const rSquared = r * r;
    
    // Penanganan khusus jika a atau b adalah 0 agar teks lebih rapi
    const textA = a === 0 ? "x" : `(x ${signA})`;
    const textB = b === 0 ? "y" : `(y ${signB})`;
    
    // Format: (x - a)^2 + (y - b)^2 = r^2
    let equationHTML = `${textA}<sup>2</sup> + ${textB}<sup>2</sup> = ${rSquared}`;
    
    // Jika a=0, ubah (x)^2 menjadi x^2 saja
    if(a === 0) equationHTML = equationHTML.replace("(x)<sup>2</sup>", "x<sup>2</sup>");
    if(b === 0) equationHTML = equationHTML.replace("(y)<sup>2</sup>", "y<sup>2</sup>");
    
    document.getElementById('outputEquation').innerHTML = equationHTML;

    // 3. Gambar di Canvas
    drawGrid();

    // Konversi koordinat Matematika ke Koordinat Canvas
    // canvasX = centerX + (mathX * scale)
    // canvasY = centerY - (mathY * scale) -> Y dibalik karena koordinat layar Y positif ke bawah
    
    const canvasA = centerX + (a * scale);
    const canvasB = centerY - (b * scale);
    const canvasR = r * scale;

    // Gambar Lingkaran
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb'; // Warna Biru
    ctx.lineWidth = 3;
    ctx.arc(canvasA, canvasB, canvasR, 0, 2 * Math.PI);
    ctx.stroke();

    // Gambar Titik Pusat
    ctx.beginPath();
    ctx.fillStyle = '#dc2626'; // Warna Merah
    ctx.arc(canvasA, canvasB, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Label Pusat
    ctx.fillStyle = '#000';
    ctx.font = "12px Arial";
    ctx.fillText(`P(${a}, ${b})`, canvasA + 5, canvasB - 5);
}

// Event Listener untuk Tombol
calculateBtn.addEventListener('click', updateGraph);

// Jalankan fungsi saat halaman pertama kali dimuat
updateGraph();