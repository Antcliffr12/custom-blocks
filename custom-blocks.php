<?php 
/**
 * Plugin Name: Custom Blocks - Gutenberg Blocks Collection
 * Description: A collection of handy Gutenberg blocks to help you get started with WordPress Gutenberg editor
 * Author: Ryan Antcliff
 * Version: 1.0.0
 */

//exit if accessed directly
if (!defined('ABSPATH')) {
     exit;
}

function custom_blocks_main_plugin_file(){
    return __FILE__;
}

//load plugin
require_once plugin_dir_path(__FILE__) . 'loader.php';
