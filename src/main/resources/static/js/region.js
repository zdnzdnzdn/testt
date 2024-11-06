// console.log("Region");

$(document).ready(() => {
    // Inisialisasi DataTable untuk tabel dengan id "tb-region"
    $("#tb-region").DataTable({
      ajax: {
        method: "GET",
        url: "/api/region", // URL API untuk mengambil data region
        dataSrc: "", // Data source kosong karena response langsung berupa array
      },
      columnDefs: [{ className: "text-center", targets: "_all" }], // Styling kolom tengah
      columns: [
        { data: "id" }, // Kolom ID
        { data: "name" }, // Kolom Name
        {
          data: null,
          render: (data) => {
            // Render kolom action buttons
            return `
              <div class="d-flex gap-3 justify-content-center align-items-center">
                <button
                  type="button" 
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#detail"
                  onclick="findById(${data.id})"
                >
                  Detail
                </button>
                <button
                  type="button"
                  class="btn btn-warning btn-sm" 
                  data-bs-toggle="modal"
                  data-bs-target="#update"
                  onclick="beforeUpdate(${data.id})"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  onclick="deleteRegion(${data.id})"
                >
                  Delete
                </button>
              </div>
            `;
          },
        },
      ],
    });
  });
  
  // Handle create region
  $("#create-region").click((event) => {
    event.preventDefault();
  
    const valueName = $("#create-name").val();
  
    if (!valueName) {
      // Validasi form kosong
      Swal.fire({
        position: "center",
        icon: "error", 
        title: "Please fill all field!!!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      // Ajax POST request untuk create
      $.ajax({
        method: "POST",
        url: "/api/region",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({
          name: valueName
        }),
        success: (res) => {
          $("#create").modal("hide");
          $("#tb-region").DataTable().ajax.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Region has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          $("#create-name").val("");
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  });
  
  // Get region by ID untuk detail
  function findById(id) {
    $.ajax({
      method: "GET", 
      url: `/api/region/${id}`,
      dataType: "JSON",
      contentType: "application/json",
      success: (res) => {
        $("#detail-id").val(res.id);
        $("#detail-name").val(res.name);
      },
      error: (err) => {
        console.log(err); 
      }
    });
  }
  
  // Get region by ID untuk update
  function beforeUpdate(id) {
    $.ajax({
      method: "GET",
      url: `/api/region/${id}`,
      dataType: "JSON", 
      contentType: "application/json",
      success: (res) => {
        $("#update-id").val(res.id);
        $("#update-name").val(res.name);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  // Handle update region
  $("#update-region").click((event) => {
    event.preventDefault();
  
    const valueName = $("#update-name").val();
    const valueId = $("#update-id").val();
    
    if (!valueName) {
      // Validasi form kosong
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all field!!!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      // Ajax PUT request untuk update
      $.ajax({
        method: "PUT",
        url: `/api/region/${valueId}`,
        dataType: "JSON",
        contentType: "application/json", 
        data: JSON.stringify({
          name: valueName
        }),
        success: (res) => {
          $("#update").modal("hide");
          $("#tb-region").DataTable().ajax.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Region has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          $("#update-name").val("");
          $("#update-id").val("");
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  });
  
  // Handle delete region
  function deleteRegion(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-sm ms-3",
        cancelButton: "btn btn-danger btn-sm"
      },
      buttonsStyling: false
    });
  
    // Konfirmasi delete dengan SweetAlert
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Ajax DELETE request
        $.ajax({
          method: "DELETE",
          url: `/api/region/${id}`,
          dataType: "JSON",
          contentType: "application/json",
          success: (res) => {
            $("#tb-region").DataTable().ajax.reload();
          },
          error: (err) => {
            console.log(err);
          }
        });
        
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Region has been deleted.",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your Region is safe :)",
          icon: "error"
        });
      }
    });
  }