import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';

import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, textcolor, blockbgcolor } = attributes;

	const onChangeText = ( newtext ) => {
		setAttributes( { text: newtext } );
	};
	const onChangeAlignment = ( newalignment ) => {
		setAttributes( { alignment: newalignment } );
	};

	const onBlockBackgroundColorChange = ( newBGColor ) => {
		setAttributes( { blockbgcolor: newBGColor } );
	};

	const onTextColorChange = ( newTextColor ) => {
		setAttributes( { textcolor: newTextColor } );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen={ false }
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: blockbgcolor,
							onChange: onBlockBackgroundColorChange,
							label: __( 'Block Background Color', 'text-box' ),
						},
						{
							value: textcolor,
							onChange: onTextColorChange,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textcolor }
						backgroundColor={ blockbgcolor }
					/>
				</PanelColorSettings>
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
