import GaugeChart from "@/components/GaugeChart";
import Header from "@/components/Header";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentWithMeta extends Comment {
  wordNumber: number;
}

type CommentsPageProps = {
  comments: CommentWithMeta[];
  page: string;
};

const commentsPerPage = 10;
const totalComments = 500;

const Home: React.FC<CommentsPageProps> = ({ comments, page }) => {
  const title = `Take home test page: ${page}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        page={Number(page)}
        totalComments={totalComments}
        commentsPerPage={commentsPerPage}
      />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <ul>
          {comments.map(({ id, name, email, body, wordNumber }) => (
            <li
              key={id}
              className="p-4 bg-white rounded-lg shadow-md mb-4 block"
            >
              <div className="flex items-center gap-4">
                <GaugeChart value={wordNumber} max={35} />
                <div>
                  <h2 className="font-semibold text-sm">{name}</h2>
                  <time className="text-sm text-gray-500">{email}</time>
                </div>
              </div>
              <p className="text-sm leading-loose text-gray-500 mt-4">{body}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.page as string;
  let error = "";
  let comments: Comment[] = [];
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${commentsPerPage}`
  );
  try {
    comments = await res.json();
  } catch (e) {
    error = "Oops! We're having trouble loading the comments right now.";
  }

  const commentsWithWordNumber = comments.map((comment) => ({
    ...comment,
    wordNumber: comment.body.replace(/\n/g, " ").split(/\s+/).length,
  }));

  return {
    props: {
      comments: commentsWithWordNumber,
      page,
      error,
    },
    revalidate: 600, // ISR - Revalidate every 10 minutes (600 seconds)
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(totalComments / commentsPerPage);
  // Create paths for each page
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: `${index + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
};
