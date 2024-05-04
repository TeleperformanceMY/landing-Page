// Function to automatically translate the page
function autoTranslatePage() {
    // Detect the language of the page
    var lang = $('html').attr('lang');

    // Get all elements containing text
    $('body *').contents().filter(function() {
        return this.nodeType === 3 && this.nodeValue.trim() !== '';
    }).each(function() {
        // Translate each text node
        var text = $(this).text();
        translateText(text, lang, function(translatedText) {
            $(this).text(translatedText);
        }.bind(this));
    });
}

// Function to translate text using Google Translate API
function translateText(text, sourceLang, callback) {
    var targetLang = 'en'; // Change this to the language you want to translate to
    var apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURI(text);

    // Make AJAX request to Google Translate API
    $.ajax({
        url: apiUrl,
        success: function(response) {
            var translatedText = response[0][0][0];
            callback(translatedText);
        }
    });
}

// Call the autoTranslatePage function when the page loads
$(document).ready(function() {
    autoTranslatePage();

    // Get the video element
    var video = document.querySelector('.video-container video');

    // Add sound to the video
    video.volume = 5; // Set the volume level to maximum (1)
});
