// Get all regions
function getAllRegions() {
    return $.ajax({
        method: "GET",
        url: "/api/region",
        dataType: "JSON",
        contentType: "application/json"
    });
}

// Initialize DataTable
$(document).ready(() => {
    $("#tb-country").DataTable({
        ajax: {
            method: "GET",
            url: "/api/country",
            dataSrc: "",
        },
        columnDefs: [{ className: "text-center", targets: "_all" }],
        columns: [
            { data: "id" },
            { data: "code" },
            { data: "name" },
            { data: "region.name" },
            {
                data: null,
                render: (data) => {
                    return `
                        <div class="d-flex gap-3 justify-content-center align-items-center">
                            <button
                                type="button" 
                                class="btn btn-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#detail"
                                onclick="findById(${data.id})"
                            >
                                <i class="bi bi-eye"></i> Detail
                            </button>
                            <button
                                type="button"
                                class="btn btn-warning btn-sm" 
                                data-bs-toggle="modal"
                                data-bs-target="#update"
                                onclick="beforeUpdate(${data.id})"
                            >
                                <i class="bi bi-pencil"></i> Update
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                onclick="deleteCountry(${data.id})"
                            >
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    `;
                },
            },
        ],
    });

    // Populate region dropdown in create modal
    getAllRegions().done((regions) => {
        const $createRegionSelect = $("#create-region");
        $createRegionSelect.empty();
        
        $createRegionSelect.append($('<option>', {
            value: "",
            text: "Select Region"
        }));

        regions.forEach(region => {
            $createRegionSelect.append($('<option>', {
                value: region.id,
                text: region.name
            }));
        });
    }).fail((err) => {
        console.log("Error loading regions:", err);
    });
});

// Handle create country
$("#create-country").click((event) => {
    event.preventDefault();

    const valueCode = $("#create-code").val();
    const valueName = $("#create-name").val();
    const valueRegionId = $("#create-region").val();

    if (!valueCode || !valueName || !valueRegionId) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please fill all fields!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    const data = {
        code: valueCode,
        name: valueName,
        regionId: parseInt(valueRegionId)
    };

    $.ajax({
        method: "POST",
        url: "/api/country",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (res) => {
            $("#create").modal("hide");
            $("#tb-country").DataTable().ajax.reload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Country has been created",
                showConfirmButton: false,
                timer: 1500
            });
            // Reset create form fields
            $("#create-code").val('');
            $("#create-name").val('');
            $("#create-region").val('');
        },
        error: (err) => {
            console.log("Create error:", err);
            Swal.fire({
                icon: "error",
                title: "Failed to create country",
                text: err.responseJSON?.message || "Unknown error occurred"
            });
        }
    });
});

// Reset create form when modal is hidden
$('#create').on('hidden.bs.modal', function () {
    $("#create-code").val('');
    $("#create-name").val('');
    $("#create-region").val('');
});

// Get country by ID for detail view
function findById(id) {
    $.ajax({
        method: "GET",
        url: `/api/country/${id}`,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-id").val(res.id);
            $("#detail-code").val(res.code);
            $("#detail-name").val(res.name);
            $("#detail-region").val(res.region.name);
        },
        error: (err) => {
            console.log("Error fetching country details:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load country details"
            });
        }
    });
}

// Get country by ID for update
function beforeUpdate(id) {
    $.when(
        $.ajax({
            method: "GET",
            url: `/api/country/${id}`,
            dataType: "JSON",
            contentType: "application/json"
        }),
        getAllRegions()
    ).done((countryRes, regionsRes) => {
        const country = countryRes[0];
        const regions = regionsRes[0];

        $("#update-id").val(country.id);
        $("#update-code").val(country.code);
        $("#update-name").val(country.name);

        const $regionSelect = $("#update-region");
        $regionSelect.empty();
        
        $regionSelect.append($('<option>', {
            value: "",
            text: "Select Region"
        }));

        regions.forEach(region => {
            $regionSelect.append($('<option>', {
                value: region.id,
                text: region.name,
                selected: region.id === country.region.id
            }));
        });
    }).fail((err) => {
        console.log("Error in beforeUpdate:", err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load update data"
        });
    });
}

// Handle update country
$("#update-country").click((event) => {
    event.preventDefault();

    const valueId = $("#update-id").val();
    const valueCode = $("#update-code").val();
    const valueName = $("#update-name").val();
    const valueRegionId = $("#update-region").val();

    if (!valueCode || !valueName || !valueRegionId) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please fill all fields!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    const data = {
        code: valueCode,
        name: valueName,
        regionId: parseInt(valueRegionId)
    };

    $.ajax({
        method: "PUT",
        url: `/api/country/${valueId}`,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (res) => {
            $("#update").modal("hide");
            $("#tb-country").DataTable().ajax.reload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Country has been updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: (err) => {
            console.log("Update error:", err);
            Swal.fire({
                icon: "error",
                title: "Failed to update country",
                text: err.responseJSON?.message || "Unknown error occurred"
            });
        }
    });
});

// Reset update form when modal is hidden
$('#update').on('hidden.bs.modal', function () {
    $("#update-id").val('');
    $("#update-code").val('');
    $("#update-name").val('');
    $("#update-region").val('');
});

// Handle delete country
function deleteCountry(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "DELETE",
                url: `/api/country/${id}`,
                success: () => {
                    $("#tb-country").DataTable().ajax.reload();
                    Swal.fire(
                        'Deleted!',
                        'Country has been deleted.',
                        'success'
                    );
                },
                error: (err) => {
                    console.log("Delete error:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Failed to delete country",
                        text: err.responseJSON?.message || "Unknown error occurred"
                    });
                }
            });
        }
    });
}