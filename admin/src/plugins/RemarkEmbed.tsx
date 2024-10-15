import { type Root } from 'mdast';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';

type PluginT = {
  enabled?: boolean;
};

type YoutubeEmbedT = {
  width?: number;
  height?: number;
};

const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

export const isYoutubeUrl = (url: string): boolean => {
  return youtubeRegex.test(url);
};

export const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

const getYouTubeEmbedHtml = (url: string, options: YoutubeEmbedT = { width: 560, height: 315 }): string => {

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return `<p>Invalid YouTube URL</p>`;
  }

  return `<iframe
    class="embed youtube"
    width="${options.width}"
    height="${options.height}"
    src="https://www.youtube.com/embed/${videoId}"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube Video"></iframe>`;
};

const plugin: Plugin<[PluginT?], Root> = function (options = {}) {
    const { enabled = true } = options;//defaults

    return function (tree) {
        if (!enabled) {
            return;
        }
        visit(tree, 'image', (node,index,parent) => {

            if (isYoutubeUrl(node.url)) {

                // Casting node to any to allow modification
                const updatedNode = {
                  type: 'html',
                  value: getYouTubeEmbedHtml(node.url),
                  position: node.position
                } as any

                // Directly replace the node in the parent with the updatedNode
                if (parent && typeof index === 'number') {
                  parent.children[index] = updatedNode;
                }

            }
        });
    };
};

export default plugin;
