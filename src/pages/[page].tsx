import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type CommentsPageProps = {
  comments: Comment[];
  page: string;
};

const commentsPerPage = 10;
const totalComments = 500;

const Home: React.FC<CommentsPageProps> = ({ comments, page }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Take home test</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1>Comments list page {page}</h1>
        <div>
          <button
            disabled={page <= "1"}
            onClick={() => router.push(`/${parseInt(page, 10) - 1}`)}
          >
            Previous
          </button>
          <button onClick={() => router.push(`/${parseInt(page, 10) + 1}`)}>
            Next
          </button>
        </div>
        <ul>
          {comments.map(({ id, name, email, body }) => (
            <div key={id} className="p-4 bg-white rounded-lg shadow-md mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-sm">{name}</h3>
                  <time className="text-sm text-gray-500">{email}</time>
                </div>
              </div>
              <p className="text-sm leading-loose text-gray-500 mt-4">{body}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-200 text-green-700 rounded-full">
                Positive
              </span>
            </div>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.page as string;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${commentsPerPage}`
  );
  const comments = await res.json();

  return {
    props: {
      comments,
      page,
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
