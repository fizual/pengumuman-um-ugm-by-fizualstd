function sendData() {
    document.getElementById('alert').style.display = 'none'; // Change 'hide' to 'none' to hide the alert initially
    var nama = document.getElementById("nama").value.trim().toUpperCase(); // Convert name to uppercase
    var nomor = document.getElementById("no-peserta").value.trim(); // Assuming this is the participant number field
    var day = document.getElementById("lahir-day").value.trim();
    var month = document.getElementById("lahir-month").value.trim();
    var year = document.getElementById("lahir-year").value.trim();
    var prodi = document.getElementById("prodi").value.trim(); // Assuming this is the program of study input field
    var err = '';

    if (nama == '') {
        err = 'Nama tidak boleh kosong';
    } else if (nomor == '') {
        err = 'Nomor peserta tidak boleh kosong';
    } else if (day == '' || month == '' || year == '') {
        err = 'Tanggal lahir lengkap harus diisi';
    } else if (prodi == '') {
        err = 'Program studi tidak boleh kosong';
    }

    if (err != '') {
        document.getElementById('alert').innerHTML = err;
        document.getElementById('alert').style.display = 'block';
        return false;
    } else {
        var tgl_lahir = year + "-" + ('00' + month).slice(-2) + "-" + ('00' + day).slice(-2);
        const resultData = {
            nama: nama,
            no_peserta: nomor,
            tgl_lahir: tgl_lahir,
            prodi: prodi,
            diterima: '1' // Always set to '1' to indicate accepted
        };

        if (resultData.diterima == '1') {
            accepted(resultData);
        } else {
            rejected(resultData);
        }
    }
}


function rejected(data) {
    var tmpl =
        '<div id="index-rejected" class="index-rejected">' +
        '<div class="index-rejected-header">' +
        '<img src="/pengumuman/img/ugm-putih.png" alt="Logo" class="index-rejected-header-icon">' +
        '<div class="header-title">' +
        '<h1 class="index-rejected-header-title-text">ANDA DINYATAKAN TIDAK LULUS SELEKSI</h1>' +
        '<span class="index-rejected-header-title-sub">TERIMA KASIH TELAH MENGIKUTI UJIAN MASUK UNIVERSITAS GADJAH MADA.</span>' +
        ' </div>' +
        '</div>' +
        '<div class="index-rejected-content">' +
        '<div class="index-rejected-content-upper">' +
        '<div class="index-rejected-content-upper-bio">' +
        '<span class="index-rejected-content-upper-bio-nisn" id="index-rejected-nisn">' + data.no_peserta + '</span>' +
        '<span class="index-rejected-content-upper-bio-name" id="index-rejected-name">' + data.nama + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="index-rejected-content-lower">' +
        '<div class="index-rejected-content-lower-column index-rejected-content-lower-column-25">' +
        '<div class="index-rejected-content-lower-column-field">' +
        '<span class="index-rejected-content-lower-column-field-caption">Tanggal Lahir</span>' +
        '<span class="index-rejected-content-lower-column-field-value" id="index-rejected-birthday">' + formatDate(data.tgl_lahir) + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('index').innerHTML = tmpl;
}

function accepted(data) {
    var tmpl =
        '<div id="index-accepted" class="index-accepted">' +
        '<div class="index-accepted-header">' +
        '<img src="/pengumuman/img/ugm-putih.png" alt="Logo" class="index-accepted-header-icon">' +
        '<div class="index-accepted-header-title">' +
        '<h1 class="index-accepted-header-title-text">SELAMAT! ANDA DINYATAKAN LULUS SELEKSI</h1>' +
        '</div>' +
        '</div>' +
        '<div class="index-accepted-content">' +
        '<div class="index-accepted-content-upper">' +
        '<div class="index-accepted-content-upper-bio">' +
        '<span class="index-accepted-content-upper-bio-nisn" id="index-accepted-nisn">' + data.no_peserta + '</span>' +
        '<span class="index-accepted-content-upper-bio-name" id="index-accepted-name">' + data.nama + '</span>' +
        '<span class="index-accepted-content-upper-bio-program" id="index-accepted-program">' + data.prodi + '</span>' +
        '</div>' +
        '<img class="index-accepted-content-upper-qr" alt="QR" id="index-accepted-qr" src="/pengumuman/img/qr-code.png">' +
        '</div>' +
        '<div class="index-accepted-content-lower">' +
        '<div class="index-accepted-content-lower-column index-accepted-content-lower-column-25">' +
        '<div class="index-accepted-content-lower-column-field">' +
        '<span class="index-accepted-content-lower-column-field-caption">Tanggal Lahir</span>' +
        '<span class="index-accepted-content-lower-column-field-value" id="index-accepted-birthday">' + formatDate(data.tgl_lahir) + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="index-accepted-content-lower-column index-accepted-content-lower-column-50">' +
        '<div class="index-accepted-content-lower-column-note">' +
        '<span class="index-accepted-content-lower-column-note-title">Informasi</span><ul>'+
        '<li>Prosedur Registrasi Calon Mahasiswa dapat dilihat <a href="http://ugm.id/pengumumanUM" target="_blank">di sini</a>.</li>'+
        '<li>Informasi hunian asrama bagi mahasiswa baru UGM <a href="https://residence.ugm.ac.id/" target="_blank" class="index-accepted-content-lower-column-note-link" id="index-accepted-link">https://residence.ugm.ac.id</a></li>'+
        '<li>Informasi tentang PIONIR Gadjah Mada <a href="http://ugm.id/PIONIRUGM/" target="_blank" class="index-accepted-content-lower-column-note-link" id="index-accepted-link">http://ugm.id/PIONIRUGM</a></li>'+
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="index-accepted-footer">' +
        '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('index').innerHTML = tmpl;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
