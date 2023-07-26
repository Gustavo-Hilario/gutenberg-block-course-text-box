<?php

/**
 * Plugin Name:       Textbox
 * Description:       A box of text
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gustavo Hilario
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       text-box
 */

function blocks_course_text_box_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'blocks_course_text_box_block_init');
