// Set the Monaco vendor path.
require.config({
    paths: {
        'vs': '/wp-content/plugins/wp-monaco-editor/assets/vendor/monaco/min/vs'
    }
});

window.currentContentValue = document.getElementById('content').value;

window.startMonitor = () => {
    // When the default content editor value changes, also set the value of the Monaco editor.
	window.monitorChanges = setInterval(() => {
		var oldValue = window.currentContentValue;
		var newValue = document.getElementById('content').value;

		if (oldValue != newValue) {
			var value = document.getElementById('content').value;

			window.editor.setValue(value);

			// window.editor.getAction('editor.action.formatDocument').run();

			window.currentContentValue = newValue;
		}
	}, 250);
};

window.stopMonitor = () => {
	clearInterval(window.monitorChanges);
};

// Require the Monaco editor.
require(['vs/editor/editor.main'], function() {
    // Get the main content element.
    var contentElement = document.getElementById('content');

    // Always hide the content element by pushing it off screen.
    contentElement.style.position = 'fixed';
    contentElement.style.left     = '-9999px';

    // Create a new div element to hold the Monaco editor.
    var monacoEditorElement = document.createElement('div');

    // Set the new div element properties.
    monacoEditorElement.id    = 'monaco-editor';
    monacoEditorElement.style = 'height: 300px; margin-top: 37px;';

    // Insert the new Monaco editor element after the content element.
    contentElement.parentNode.insertBefore(monacoEditorElement, contentElement.nextSibling);

    // Initialize the Monaco element.
    window.editor = monaco.editor.create(monacoEditorElement, {
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

	// When the Monaco editor value changes, also set the value of the default content editor.
	window.editor.onKeyUp(() => {
		var value = window.editor.getValue();

		window.stopMonitor();

		document.getElementById('content').value = value;

		window.startMonitor();
	});

	window.startMonitor();
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
})(jQuery);
