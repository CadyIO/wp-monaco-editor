<?php
/**
 * WP Monaco Editor
 *
 * @package           Cady/Plugins/WP_Monaco_Editor
 *
 * @since             1.0.0
 *
 * Plugin Name:       WP Monaco Editor
 * Plugin URI:        https://github.com:CadyIO/wp-monaco-editor
 * Description:       Monaco Editor integration for WordPress
 * Author:            Cady
 * Author URI:        https://cady.io
 * Version:           1.0.0
 * License:           GNU General Public License v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Tested up to:      4.8
 * Text Domain:       wp-monaco-editor
 * Domain Path:       /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Current version of the plugin.
 *
 * @since  1.0.0
 */
define( 'WP_MONACO_EDITOR_VERSION', '1.0.0' );

/**
 * The base name of the plugin.
 *
 * @since  1.0.0
 */
define( 'WP_MONACO_EDITOR_PLUGIN_BASE_NAME', plugin_basename( __FILE__ ) );

/**
 * The base URL of the plugin.
 *
 * @since  1.0.0
 */
define( 'WP_MONACO_EDITOR_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * The base directory path of the plugin.
 *
 * @since  1.0.0
 */
define( 'WP_MONACO_EDITOR_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load the text domain.
 *
 * @since 1.0.0
 */
add_action( 'plugins_loaded', function() {
	load_plugin_textdomain( 'wp-monaco-editor', false, WP_MONACO_EDITOR_PLUGIN_DIR_PATH . '/languages/' );
} );

if ( ! function_exists( 'wp_monaco_editor_enqueue_admin_scripts' ) ) {

	/**
	 * Enqueue scripts for admin.
	 *
	 * @since 1.0.0
	 *
	 * @param string $hook_suffix string The assigned hook for the plugin.
	 */
	function wp_monaco_editor_enqueue_admin_scripts( $hook_suffix ) {
		// Only load scripts on Post Edit page.
		if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
			// Dequeue defaults.
			wp_dequeue_script( 'tinymce' );

			// Styles.
			wp_enqueue_style( 'wp-monaco-editor-css', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/css/wp-monaco-editor.css', array(), WP_MONACO_EDITOR_VERSION );

			// Scripts.
			wp_enqueue_script( 'monaco-editor', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/vendor/monaco/min/vs/loader.js', array( 'jquery' ), WP_MONACO_EDITOR_VERSION, true );
			wp_enqueue_script( 'wp-monaco-post-editor-js', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/js/wp-monaco-post-editor.js', array( 'monaco-editor' ), WP_MONACO_EDITOR_VERSION, true );
		}

		// Only load scripts on Plugin editor page.
		if ( 'plugin-editor.php' === $hook_suffix || 'theme-editor.php' === $hook_suffix ) {
			// Dequeue defaults.
			wp_dequeue_script( 'tinymce' );

			// Styles.
			wp_enqueue_style( 'wp-monaco-editor-css', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/css/wp-monaco-editor.css', array(), WP_MONACO_EDITOR_VERSION );

			// Scripts.
			wp_enqueue_script( 'monaco-editor', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/vendor/monaco/min/vs/loader.js', array( 'jquery' ), WP_MONACO_EDITOR_VERSION, true );
			wp_enqueue_script( 'wp-monaco-plugins-themes-editor-js', WP_MONACO_EDITOR_PLUGIN_DIR_URL . 'assets/js/wp-monaco-plugins-themes-editor.js', array( 'monaco-editor' ), WP_MONACO_EDITOR_VERSION, true );
		}
	}

} // wp_monaco_editor_enqueue_admin_scripts

add_action( 'admin_enqueue_scripts', 'wp_monaco_editor_enqueue_admin_scripts' );
