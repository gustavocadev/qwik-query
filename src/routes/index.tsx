import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  Form,
  routeAction$,
  zod$,
  z,
} from '@builder.io/qwik-city';

export const useAddQuery = routeAction$(
  async (values, event) => {
    const url = new URL('/', event.url.origin);

    url.searchParams.set('q', values.q);

    console.log('url', url.search);
    console.log('url', url.href);

    // Not working any of these, I expect to be redirected to /?q=foo, but the url doesnt change
    // I noticed that only when I add the query doesnt work, because it works with normal routes
    // throw event.redirect(303, `/${url.search}`);
    // throw event.redirect(303, url.href);
  },
  zod$({
    q: z.string(),
  })
);

export default component$(() => {
  const addQuery = useAddQuery();
  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <Form action={addQuery}>
        <label for="">
          <input type="text" name="q" />
        </label>

        <button type="submit">Add query</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
