import { type Root } from 'mdast';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const plugin: Plugin<[], Root> = function () {
    return function (tree) {
        visit(tree, 'list', (node) => {
            // Check if all children are list items containing only images
            const allImages = node.children.every(listItem =>
              listItem.type === 'listItem' &&
              listItem.children.length === 1 &&
              listItem.children[0].type === 'paragraph' &&
              listItem.children[0].children.length === 1 &&
              listItem.children[0].children[0].type === 'image'
            );

            if (allImages) {
              // Add class to the list node
              node.data = node.data || {};
              node.data.hProperties = {
                class: 'image-gallery',
              };
            }
        });
    };
};

export default plugin;
