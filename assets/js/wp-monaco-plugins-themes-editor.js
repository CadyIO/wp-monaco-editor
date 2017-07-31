// Set the Monaco vendor path.
require.config({
    paths: {
        'vs': '/wp-content/plugins/wp-monaco-editor/assets/vendor/monaco/min/vs'
    }
});

// Require the Monaco editor.
require(['vs/editor/editor.main'], function() {
    // Get the main content element.
    var contentElement = document.getElementById('newcontent');

    // Create a new div element to hold the Monaco editor.
    var monacoEditorElement = document.createElement('div');

    // Set the new div element properties.
    monacoEditorElement.id    = 'monaco-editor';
    monacoEditorElement.style = 'height: 500px;';

    // Insert the new Monaco editor element after the content element.
    contentElement.parentNode.insertBefore(monacoEditorElement, contentElement.nextSibling);

    var fileName      = document.getElementsByName("file")[0].value;
    var fileNameSplit = fileName.split('.');
    var fileExtension = fileNameSplit[fileNameSplit.length - 1];

    // Initialize the Monaco element.
    var editor = monaco.editor.create(monacoEditorElement, {
        value: contentElement.value,
        language: fileExtension,
        lineNumbers: true,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: "vs-dark",
        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 120,
        wordWrapMinified: true,
        wrappingIndent: "indent",
    });

    // Always hide the content element by pushing it off screen.
    contentElement.style.position = 'fixed';
    contentElement.style.left     = '-9999px';
});

(function ($) {
    // When the Monaco editor value changes, also set the value of the default content editor.
    $("#monaco-editor").on("change paste keyup", function() {
        var newValue = $(this).val();

        $('#newcontent').val(newValue);
    });

    // When the default content editor value changes, also set the value of the Monaco editor.
    $("#newcontent").on("change paste keyup", function() {
        var newValue = $(this).val();

        $('#monaco-editor').val(newValue);
    });
})(jQuery);