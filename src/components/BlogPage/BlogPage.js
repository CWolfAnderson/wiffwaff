import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './BlogPage.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
const contentful = require('contentful');

const SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

function useContentful(slug) {
  let [blog, setBlog] = useState({});

  useEffect(() => {
    const client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    });

    client.getEntries({
      'content_type': 'blog',
      'fields.slug': slug,
      // 'select': ['fields.title', 'fields.body', 'fields.titleBackgroundImage', 'fields.seoTitle', 'fields.categories', 'fields.metaDescription'].join(','),
    }).then((data) => {
      console.log('data', data);
      if (data && data.items.length > 0) {
        const blog = data.items[0].fields;
        console.log('blog before:', blog);
        blog.titleBackgroundImage = blog.titleBackgroundImage.fields.file;
        blog.createdAt = data.items[0].sys.createdAt;
        blog.updatedAt = data.items[0].sys.updatedAt;
        console.log('blog after:', blog);
        setBlog(blog);
      }
    }).catch(error => {
      console.log(error);
    });
  }, [slug]);

  return blog;

}
const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { images } = node.data.target.fields;
      // console.log('fields', node.data.target.fields);

      let imageElements = [];
      if (images) {
        imageElements = images.map((image) => {
          const url = `https:${image.fields.file.url}`;
          return (
            <img
              alt={image.fields.file.url}
              height="400px"
              key={image.fields.file.url}
              src={url}
            />
          );
        });
      }

      return (
        <div>
          {imageElements}
        </div>
      );
    }
  }
};

function BlogPage(props) {

  let blog = useContentful(props.match.params.slug);
  const categories = blog && blog.categories ? blog.categories[0] : '';
  const titleBackgroundImageUrl = blog && blog.titleBackgroundImage ? `https:${blog.titleBackgroundImage.url}` : '';

  return (
    <div>
      <Helmet>
        <title>Blog</title>
        <meta property="og:title" content={`${blog.seoTitle} | Joybird`} />
        <meta name="description" content={blog.metaDescription} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content="https://www.facebook.com/wearejoybird" />
        <meta property="article:section" content={categories} />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />
        <meta property="og:updated_time" content={blog.updatedAt} />
        <meta property="og:image" content={titleBackgroundImageUrl} />
        <meta property="og:image:secure_url" content={titleBackgroundImageUrl} />
      </Helmet>
      {blog.title}
        <img
          alt={titleBackgroundImageUrl}
          height="200px"
          src={titleBackgroundImageUrl}
        />
      {documentToReactComponents(blog.body, options)}
    </div>
  );
}

export default BlogPage;