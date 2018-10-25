let getChirps = () => {
    return $.get("/api/chirps/", data => {
        let chirpArray = Object.keys(data).map(chirpID => {
            let chirp = data[chirpID];
            chirp.id = chirpID;
            return chirp;
        })
        chirpArray.pop();
        chirpArray.reverse();
        chirpArray.forEach(chirp => {
            let newChirpDiv = $(
                `<div class="card text-white bg-dark mb-3 ml-2" style="width: 18rem;">
                    <div class="card-body">
                        <h4 class="card-title">${chirp.author}</h4>
                        <p class="card-text">${chirp.text}</p>
                        <button data-id=${chirp.id} type="button" class="editBtn btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                        edit
                        </button>
                        <button data-id=${chirp.id} onclick="deleteChirp()" type="button" class="closeBtn close " data-dismiss="modal" aria-label="Close">
                        &times;
                        </button>
                    </div>
                </div>`
            );
            $('#chirps').append(newChirpDiv);
        })
        $('.editBtn').click(() => {
            let modalDiv = $(
                `<div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>`
            )
            $("#exampleModal").append(modalDiv);
        })
    });
};

getChirps();

$("#sumbitBtn").click(() => {
    let chirpAuthor = $("#nameInput").val();
    let chirpText = $("#chirpInput").val();
    let chirp = {
        author: chirpAuthor,
        text: chirpText
    }
    $.post("/api/chirps/", chirp).then(() => {
        $("#chirps").empty();
        getChirps();
    });
})

let deleteChirp = () => {
    $.ajax({
        url: `/api/chirps/${event.target.dataset.id}`,
        type: 'DELETE',
        success: function () {
            console.log('element deleted')
        }
    }).then(() => {
        $("#chirps").empty();
        getChirps();
    })
};
