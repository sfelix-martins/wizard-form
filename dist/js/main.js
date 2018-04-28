jQuery.extend(jQuery.validator.messages, {
    required: 'Give an answer, please.',
});

$(function(){
    $('[type="date"].min-today').prop('min', function(){
        return new Date().toJSON().split('T')[0];
    });
});

/* include this after jquery.validate* */
$.validator.addMethod('mindate', function (v, el, minDate) {
    if (this.optional(el)) {
        return true;
    }
    var selectedDate = new Date($(el).val());
    minDate = new Date(minDate.setHours(0));
    minDate = new Date(minDate.setMinutes(0));
    minDate = new Date(minDate.setSeconds(0));
    minDate = new Date(minDate.setMilliseconds(0));

    return minDate <= selectedDate;
}, 'Date is less than {0}.');

$(document).ready(function() {
    $('.phone-us').mask('(000) 000-0000');

    var optradios= [1, 2, 3, 4, 6, 7, 8, 10];

    $('#formWizard').validate({
        rules: {
            '.min-today': {
                mindate: new Date()
            },
            '#phone': {
                required: true,
                phoneUS: true
            }
        },
    });

    $('#rootwizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current/$total) * 100;
            $('#rootwizard .progress-bar').css({width:$percent+'%'});

            var latestTab = 14;
            if ($current == latestTab) {
                $('#next-submit').text('Submit');
            } else {
                $('#next-submit').text('Next');
            }
        },
        onNext: function (tab, navigation, index) {
            var $valid = $("#formWizard").valid();
            if (!$valid) {
                return false;
            }
        },
        onPrevious: function (tab, navigation, index) {
            $('#request-loading').show();
            $('#request-success').hide();
            $('#request-error').hide();
        },
    });

    $('input[name="optradio7"]').change(function(e) { // Select the radio input group
        if ($(this).val() == 'Choose date(s)') {
            if ($("#dateTab7").is(":hidden")) {
                $("#dateTab7").show();
            }
        } else {
            $("#dateTab7").hide();
        }
    });
});

var responses = [];
function getChecked() {
  console.log('getChecked');
    // var tabIndex = $('#rootwizard').bootstrapWizard('currentIndex') + 1;
    // var question = $('#tab' + tabIndex + ' h1').text();
    // var radioValue = $("input[name=optradio" + tabIndex + "]:checked").val();

    // var optionResponse = {
    //     tab: tabIndex,
    //     question: question,
    //     responseType: 'string',
    // }

    // // Radio buttons
    // if (typeof radioValue != 'undefined') {
    //     if (radioValue == 'Choose date(s)') {
    //         optionResponse.response = $('#dateTab'+tabIndex).val();
    //     } else {
    //         optionResponse.response = radioValue;
    //     }

    //     optionResponse.id = 'optradio' + tabIndex;
    // }

    // // Tab with checkboxes
    // if (tabIndex == 5) {
    //     var additionalSelected = []

    //     $("input[name=additional]:checked").each(function() {
    //         additionalSelected.push($(this).attr('value'));
    //     });

    //     optionResponse.response = additionalSelected;
    //     optionResponse.responseType = 'array';
    //     optionResponse.id = 'additional';
    // }

    // if (tabIndex == 8) {
    //     var additionalSelected = []

    //     $("input[name=when]:checked").each(function() {
    //         additionalSelected.push($(this).attr('value'));
    //     });

    //     optionResponse.response = additionalSelected;
    //     optionResponse.responseType = 'array';
    //     optionResponse.id = 'when';
    // }

    // // Tab with text area
    // if (tabIndex == 10) {
    //     var textAreaValue = $("#comment").val();
    //     optionResponse.response = textAreaValue;
    //     optionResponse.id = '#comment';
    // }

    // var inputTextTabs = [
    //     {index: 11, id: '#zipcode'},
    //     {index: 12, id: '#email'},
    //     {index: 13, id: '#name'},
    //     {index: 14, id: '#phone'},
    // ];

    // var inputIndexes = inputTextTabs.map(function (inputText) {
    //     return inputText.index;
    // });

    // // Input texts
    // if ($.inArray(tabIndex, inputIndexes) != '-1') {
    //     var inputText = inputTextTabs.find(function (input) {
    //         return input.index == tabIndex;
    //     });

    //     if (typeof inputText != 'undefined') {
    //         var inputValue = $(inputText.id).val();
    //         optionResponse.response = inputValue;
    //         optionResponse.id = inputText.id;
    //     }
    // }

    // responses = responses.filter(function (response) {
    //     return response.tab !== optionResponse.tab;
    // });

    // responses.push(optionResponse);

    // console.log(JSON.stringify(responses));

    // if ($('#next-submit').text() == 'Submit') {
    //     console.log('Send email');
    //     sendRequest();
    // }
}

function resendResponses() {
    sendRequest();
}

function sendRequest() {
    var apiUrl = 'http://localhost:8080';

    $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: apiUrl + '/mailer',
        data: {
            'responses': responses,
        },
        success: function(msg){
            $('#request-loading').hide();
            $('#request-success').show();

            setTimeout(function () {
                $('#wizardModal').modal('hide')
            }, 3000);
        },
        error: function (err) {
            $('#request-error').show();
        }
    });
}

function chooseDate(dateId) {
  console.log('Choose Date', dateId);
    $('#' + dateId).show();
}
