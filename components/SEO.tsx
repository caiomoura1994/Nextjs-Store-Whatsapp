/* eslint-disable react/require-default-props */

import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
}

export default function SEO({
  title,
  description,
  image = '',
  link = "http://zapei-loja.netlify.app/",
}: SEOProps) {
  const pageTitle = `${title}`;

  const pageImageURL = image
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${image}`
    : null;

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="canonical" href={link} />
      <meta httpEquiv="Content-Language" content="pt-br" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />
      <meta name="title" content="metalmilitar.com.br - Fábrica de distintivos militares" />
      {description && <meta name="description" content={description} />}
      {pageImageURL && <meta name="image" content={pageImageURL} />}
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#121214" />
      <meta name="msapplication-TileColor" content="#121214" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImageURL} />
      <meta property="og:image:secure_url" content={pageImageURL} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
}
