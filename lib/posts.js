import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // remove .md from file to form an Id
        const id = fileName.replace(/\.md$/, '');

        // Read file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use gray matter to parse the post meta data section

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    });

    // sort by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        }
        return -1;
    })
}

export function getAllPostIds() {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map(filename =>{
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostsData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContent);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
