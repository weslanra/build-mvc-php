server = "http://localhost/";
nameApp = "smart_e-ping-2";

/* ======================== */
/* ======== INDEX ========= */
/* ======================== */

$("#btSubmit").click(function () {
    database = $('#database');
    url = $('#url');
    user = $('#user');
    password = $('#password');

    info = $('#containerInfo');

    if(
        database.val() != '' &&
        url.val() != '' &&
        user.val() != ''
    ){
        //Testando conexão
        $.ajax({
            type: "POST",
            url: server + nameApp + "/public/home/testingConnection",
            data: {
                database: database.val(),
                url: url.val(),
                user: user.val(),
                password: password.val()
            },
            dataType: "json",
            success: function (data) {
                if(data.status){
                    info.html("Success!");
                    info.addClass("alert-success");
                    info.removeClass("invisible");
                    info.addClass("show");

                    setTimeout(function(){location.href = server + nameApp + "/public/home/selectData"}, 500);
                }else{
                    info.html("Error: " + data.msg);
                    info.addClass("alert-danger");
                    info.removeClass("invisible");
                    info.addClass("show");
                }
            },
            beforeSend: function () {
                info.html("<img style='height: 30px; width: 30px;' src='./image/load.gif'> testing connection...");
                info.addClass("alert-info");
                info.removeClass("invisible");
                info.addClass("show");
            }
        }).fail(function (data) {
            console.log(data);

            info.html("Error na requisição: " + data);
            info.addClass("alert-danger");
            info.removeClass("invisible");
            info.addClass("show");
        });
    }else{
        info.html("Please fill in all fields");
        info.addClass("alert-info");
        info.removeClass("invisible");
        info.addClass("show");
    }
});

/* ======================== */
/* ======== INDEX ========= */
/* ======================== */

/* ======================== */
/* ====== selectData ====== */
/* ======================== */

$('.list-table .table-item').click(function () {
    tbSelect = $(this);

    if(!tbSelect.hasClass('active')){
        $('.list-table').find('a').removeClass('bg-secondary');
        $('.list-table').find('a').removeClass('text-white');
        tbSelect.addClass('bg-secondary');
        tbSelect.addClass('text-white');
    }else{
        $('.list-table .table-item').each(function () {
            $(this).removeClass('bg-secondary');
            $(this).removeClass('text-white');
        });
    }

    $('.column-list').each(function () {
        if($(this).attr('table') == tbSelect.attr('id')){
            $(this).removeClass('d-none');
            $(this).removeClass('invisible');
            $(this).addClass('d-block');
            $(this).addClass('show');
        }else{
            $(this).removeClass('d-block');
            $(this).removeClass('show');
            $(this).addClass('invisible');
            $(this).addClass('d-none');
        }
    });
});

$('.column-list a').click(function () {
    col = $(this);

    if(col.hasClass('active')){
        col.removeClass('active');

        if(!$('div[table=' + col.attr('table') + '] .active').length){
            $('#' + col.attr('table')).removeClass('active');
            $('#' + col.attr('table')).addClass('bg-secondary');
            $('#' + col.attr('table')).addClass('text-white');
        }
    }else{
        col.addClass('active');
        $('#' + col.attr('table')).removeClass('bg-secondary');
        $('#' + col.attr('table')).addClass('active');
    }
});

info = $('#containerInfo');
$('#btSelect').click(function () {
    table = $('.list-table .active');

    if(!table.length){
        info.html("Please select at least one column");
        info.addClass("alert-info");
        info.removeClass("invisible");
        info.addClass("show");
    }else{
        info.html("");
        info.removeClass("alert-info");
        info.removeClass("show");
        info.addClass("invisible");

        data = [];
        table.each(function () {
            tb = $(this);

            col = []
            $('div[table=' + tb.attr('id') + '] .active').each(function () {


                col.push(
                    {
                        field: $(this).attr('id'),
                        type: $(this).attr('data-type')
                    }
                );
            });

            data.push(
                {
                    table: tb.attr('id'),
                    column: col
                }
            );
        });

        $.ajax({
            type: "POST",
            url: server + nameApp + "/public/home/saveSelect",
            data: {select: data},
            dataType: "json",
            success: function (data) {
                if(data){
                    info.html("Success!");
                    info.addClass("alert-success");
                    info.removeClass("invisible");
                    info.addClass("show");

                    setTimeout(function(){location.href = server + nameApp + "/public/home/options"}, 500);
                }
            },
            beforeSend: function () {
                info.html("<img style='height: 30px; width: 30px;' src='./image/load.gif'> saving data...");
                info.addClass("alert-info");
                info.removeClass("invisible");
                info.addClass("show");
            }
        }).fail(function () {
            info.html("Error: unable to save data!");
            info.addClass("alert-danger");
            info.removeClass("invisible");
            info.addClass("show");
        });
    }
});

/* ======================== */
/* ====== selectData ====== */
/* ======================== */

/* ======================== */
/* ======== Options ======= */
/* ======================== */
containerDataOrion = $('#containerDataOrion');

$('#checkOrionNo').change(function () {
    containerDataOrion.removeClass('show');
    containerDataOrion.addClass('invisible');
    containerDataOrion.addClass('d-none');
});

$('#checkOrionYes').change(function () {
    containerDataOrion.removeClass('invisible');
    containerDataOrion.removeClass('d-none');
    containerDataOrion.addClass('show');
});

$('#btOptions').click(function () {
    orionIP = $('#orionIp').val();
    orionPort = $('#orionPort').val();

    $.ajax({
        type: "POST",
        url: server + nameApp + "/public/CRUD/completeTranslation",
        data: {
            orionIP: orionIP,
            orionPort: orionPort
        },
        dataType: "json",
        success: function (data) {
            if(data['qtdErro']){//Falha ao enviar pelo menos uma entidade
                info.html("Não foi possível enviar todos os dados! Falha em " + data['qtdErro'] + " de " + data['qtdEntities'] + " objetos.");
                info.addClass("alert-warning");
                info.removeClass("invisible");
                info.addClass("show");

                console.log(data);
            }else{//Sucesso
                info.html("Sucesso! Objetos enviados: " + data['qtdEntities']);
                info.addClass("alert-success");
                info.removeClass("invisible");
                info.addClass("show");
            }
        },
        beforeSend: function () {
            info.html("<img style='height: 30px; width: 30px;' src='" + server + nameApp + "/public/image/load.gif'> saving data...");
            info.addClass("alert-info");
            info.removeClass("invisible");
            info.addClass("show");
        }
    }).fail(function (data) {
        console.log(data);
        info.html("Erro: erro na tradução da base de dados!");
        info.addClass("alert-danger");
        info.removeClass("invisible");
        info.addClass("show");
    });
});

/* ======================== */
/* ======== Options ======= */
/* ======================== */