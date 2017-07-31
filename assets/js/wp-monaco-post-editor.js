// Set the Monaco vendor path.
require.config({
    paths: {
        'vs': '/wp-content/plugins/wp-monaco-editor/assets/vendor/monaco/min/vs'
    }
});

// Require the Monaco editor.
require(['vs/editor/editor.main'], function() {
    // Get the main content element.
    var contentElement = document.getElementById('content');

    // Create a new div element to hold the Monaco editor.
    var monacoEditorElement = document.createElement('div');

    // Set the new div element properties.
    monacoEditorElement.id    = 'monaco-editor';
    monacoEditorElement.style = 'height: 300px; margin-top: 37px;';

    // Insert the new Monaco editor element after the content element.
    contentElement.parentNode.insertBefore(monacoEditorElement, contentElement.nextSibling);

    // Initialize the Monaco element.
    var editor = monaco.editor.create(monacoEditorElement, {
        value: contentElement.value,
        language: 'html',
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
    // On 'Visual' tab click, hide the Monaco editor.
    $('#content-tmce').on('click', () => {
        $('#monaco-editor').hide();
    });

    // On 'Text' tab click, show the Monaco editor.
    $('#content-html').on('click', () => {
        $('#monaco-editor').show();
    });

    // When the Monaco editor value changes, also set the value of the default content editor.
    $("#monaco-editor").on("change paste keyup", function() {
        var newValue = $(this).val();

        $('#content').val(newValue);
    });

    // When the default content editor value changes, also set the value of the Monaco editor.
    $("#content").on("change paste keyup", function() {
        var newValue = $(this).val();

        $('#monaco-editor').val(newValue);
    });
})(jQuery);