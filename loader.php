<?php 

function custom_block_loader(){
    require_once plugin_dir_path(__FILE__) . 'dist/init.php';

}

add_action('plugins_loaded', 'custom_block_loader');
