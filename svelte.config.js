import adapterNode from '@sveltejs/adapter-node';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		adapter: process.env.CF_PAGES ? adapterCloudflare() : adapterNode()
	}
};
