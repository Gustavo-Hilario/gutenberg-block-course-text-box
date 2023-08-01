import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';

import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<BlockControls
				controls={ [
					{
						title: 'Button 1',
						icon: 'admin-generic',
						isActive: true,
						onClick: () => console.log( 'Button 1 Clicked' ),
					},
					{
						title: 'Button 2',
						icon: 'admin-collapse',
						onClick: () => console.log( 'Button 2 Clicked' ),
					},
				] }
			>
				<ToolbarGroup>
					<ToolbarButton
						title="Align left"
						icon="editor-alignleft"
						onClick={ () => console.log( 'Align left' ) }
					/>
					<ToolbarButton
						title="Align center"
						icon="editor-aligncenter"
						onClick={ () => console.log( 'Align center' ) }
					/>
					<ToolbarButton
						title="Align right"
						icon="editor-alignright"
						onClick={ () => console.log( 'Align right' ) }
					/>
					<ToolbarDropdownMenu
						icon="arrow-down-alt2"
						label={ __( 'More alignments', 'text-box' ) }
						controls={ [
							{
								title: __( 'Align left', 'text-box' ),
								icon: 'editor-alignleft',
								onClick: () => console.log( 'Align left' ),
							},
							{
								title: __( 'Align center', 'text-box' ),
								icon: 'editor-aligncenter',
								onClick: () => console.log( 'Align center' ),
							},
							{
								title: __( 'Align right', 'text-box' ),
								icon: 'editor-alignright',
								onClick: () => console.log( 'Align right' ),
							},
						] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<RichText
				{ ...useBlockProps() }
				onChange={ ( text ) => setAttributes( { text } ) } // Store updated content as a block attribute
				value={ attributes.text } //dynamic value
				placeholder={ __( 'Enter your text here …' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				tagName="h4"
			/>
		</>
	);
}
