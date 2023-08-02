import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	TextareaControl,
	TextControl,
	ColorPalette,
	ToggleControl,
	ColorPicker,
} from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, textcolor, blockbgcolor } = attributes;

	const blockDefaultColors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
		{ name: 'green', color: '#0f0' },
		{ name: 'orange', color: '#f60' },
		{ name: 'purple', color: '#f0f' },
	];

	const onChangeText = ( newtext ) => {
		setAttributes( { text: newtext } );
	};
	const onChangeAlignment = ( newalignment ) => {
		setAttributes( { alignment: newalignment } );
	};

	const onBlockBackgroundColorChange = ( newBGColor ) => {
		setAttributes( { blockbgcolor: newBGColor } );
	};

	const onToggleBgColor = ( toggledBgColor ) => {
		if ( toggledBgColor ) {
			setAttributes( { isblockbgcolorenabled: true } );
			setAttributes( { blockbgcolor: '#f60' } );
		} else {
			setAttributes( { isblockbgcolorenabled: false } );
			setAttributes( { blockbgcolor: 'transparent' } );
		}
	};

	const onTextColorChange = ( newTextColor ) => {
		setAttributes( { textcolor: newTextColor } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Text Controls', 'text-box' ) }
					icon="text"
					initialOpen
				>
					<TextControl
						label={ __( 'Label', 'text-box' ) }
						value={ text }
						onChange={ onChangeText }
						help={ __( 'Help text', 'text-box' ) }
					/>
					<TextareaControl
						label={ __( 'Nice Text Area', 'text-box' ) }
						placeholder={ __(
							'Enter your text here!',
							'text-box'
						) }
						help={ __( 'Help Textarea', 'text-box' ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen={ false }
				>
					<PanelRow>Block Background Color</PanelRow>
					<ColorPalette
						colors={ blockDefaultColors }
						value={ blockbgcolor }
						onChange={ onBlockBackgroundColorChange }
					/>

					<ToggleControl
						label={ __( 'Toggle Background Color', 'text-box' ) }
						help={ __(
							'Enable/Disable Background Color',
							'text-box'
						) }
						checked={
							blockbgcolor !== 'transparent' ? true : false
						}
						onChange={ onToggleBgColor }
					/>
					<PanelRow>Text Color</PanelRow>
					<ColorPicker
						color={ textcolor }
						enableAlpha
						onChangeComplete={ ( v ) => onTextColorChange( v.hex ) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<RichText
				// By adding className and style we don't overwrite the default classes and styles
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: `${ blockbgcolor }`,
						color: `${ textcolor }`,
					},
				} ) }
				onChange={ onChangeText } // Store updated content as a block attribute
				value={ text } //dynamic value
				placeholder={ __( 'Enter your text here …' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				tagName="h4"
			/>
		</>
	);
}
