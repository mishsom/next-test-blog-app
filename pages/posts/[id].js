import Layout from '../../components/layout';
import {getAllPostIds, getPostsData} from "../../lib/posts";
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

/***
 * [
 {
      params: {
       id: 'ssg-ssr'
       }
      },
 {
       params: {
       id: 'pre-rendering'
      }
       }
 ]
 * Note: for getAllPostIds
 * The returned list is not just an array of strings —
 * it must be an array of objects that look like the comment above.
 * Each object must have the params key
 * and contain an object with the id key (because we’re using [id] in the file name).
 * Otherwise, getStaticPaths will fail.
 */

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({params}) {
    const postData = await getPostsData(params.id);
    return {
        props: {
            postData
        }
    }
}
