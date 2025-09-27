export function convert_to_option(raw_data) {
  let normalized_data = [];
  raw_data.forEach((element) => {
    normalized_data.push({
      value: element.id,
      label: element.name,
      disabled: false,
    });
  });
  return normalized_data;
}

export function format_rupiah(angka, currency_prefix) {
  angka = angka.toString();
  var number_string = angka.replace(/[^,\d]/g, "").toString();
  var split = number_string.split(",");
  var sisa = split[0].length % 3;
  var rupiah = split[0].substr(0, sisa);
  var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  var separator;

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return currency_prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

export function format_title(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const target_classification = ["customer"];
