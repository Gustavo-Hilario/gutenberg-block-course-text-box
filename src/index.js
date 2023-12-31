import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import { __ } from '@wordpress/i18n';

// Importing deprecated versions of the block
import v1 from './deprecated/v1';
import v2 from './deprecated/v2';

registerBlockType( metadata.name, {
	icon: {
		src: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 128 128"
				width="128px"
				height="128px"
			>
				<path d="M32 122h10c1.7 0 3-1.3 3-3s-1.3-3-3-3H32c-3.9 0-7-3.1-7-7V99c0-1.7-1.3-3-3-3s-3 1.3-3 3v10C19 116.2 24.8 122 32 122zM86 122h10c7.2 0 13-5.8 13-13V99c0-1.7-1.3-3-3-3s-3 1.3-3 3v10c0 3.9-3.1 7-7 7H86c-1.7 0-3 1.3-3 3S84.3 122 86 122zM42 6H32c-7.2 0-13 5.8-13 13v10c0 1.7 1.3 3 3 3s3-1.3 3-3V19c0-3.9 3.1-7 7-7h10c1.7 0 3-1.3 3-3S43.7 6 42 6zM86 6c-1.7 0-3 1.3-3 3 0 .2 0 .3.1.5C83 9.7 83 9.8 83 10v9c0 7.2 5.8 13 13 13h9c.2 0 .3 0 .5-.1.2 0 .3 0 .5 0 1.7 0 3-1.3 3-3C109 16.3 98.7 6 86 6zM96 26c-3.9 0-7-3.1-7-7v-6.7c7 1.2 12.5 6.7 13.7 13.7H96zM39 59c0 1.7 1.3 3 3 3h44c1.7 0 3-1.3 3-3s-1.3-3-3-3H42C40.3 56 39 57.3 39 59zM89 74c0-1.7-1.3-3-3-3H42c-1.7 0-3 1.3-3 3s1.3 3 3 3h44C87.7 77 89 75.7 89 74zM69.2 89c0-1.7-1.3-3-3-3h-24c-1.7 0-3 1.3-3 3s1.3 3 3 3h24C67.9 92 69.2 90.7 69.2 89z" />
			</svg>
		),
		background: '#f28245',
		foreground: '#fff',
	},
	edit: Edit,
	save,
	// Importing deprecated versions of the block. Inverse chronological order.
	deprecated: [ v2, v1 ],
	variations: [
		{
			name: 'blocks-course/gradient-text-box',
			title: __( 'Gradient Text', 'text-box' ),
			icon: 'wordpress',
			attributes: {
				gradient: 'luminous-vivid-amber-to-luminous-vivid-orange',
				textColor: 'custom-green',
			},
		},
	],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						textAlignment: align,
					} );
				},
			},
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box', {
						shadow: true,
						gradient:
							'luminous-vivid-amber-to-luminous-vivid-orange',
					} );
				},
			},
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				// Allow transform when text length is less than 100 characters.
				isMatch: ( { text } ) => {
					return text.length < 100;
				},
				transform: ( { text, textAlignment } ) => {
					return createBlock( 'core/paragraph', {
						content: text,
						align: textAlignment,
					} );
				},
			},
		],
	},
} );
