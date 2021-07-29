<?php 

function custom_blocks_block_assets(){
    wp_enqueue_style(
        'custom-blocks-style',
        plugins_url('/build/style-index.css', dirname(__FILE__)),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . '/build/style-index.css')
    );
}

add_action('init', 'custom_blocks_block_assets');


function custom_blocks_editor_assets(){
    // Load the compiled blocks into the editor.
    wp_enqueue_script(
        'custom-blocks-index-js',
        plugins_url('/build/index.js', dirname(__FILE__)),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . '/build/index.js'),
        true
    );

    wp_enqueue_style(
        'custom-blocks-editor',
        plugins_url('/build/index.css', dirname(__FILE__)),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . '/build/index.css')
    );
}

add_action( 'enqueue_block_editor_assets', 'custom_blocks_editor_assets' );


/** Adds custom category to block editor */
function custom_blocks_block_category($categories){
    $category_title = 'Custom Blocks';

    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'custom-blocks',
                'title' => $category_title
            ),
        )
        );
}
add_filter('block_categories_all', 'custom_blocks_block_category', 10, 2);