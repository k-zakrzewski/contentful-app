import { createClient } from "contentful";
import Image from "next/image";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const getStaticProps = async () => {
  const client = createClient({
    space: "s4gdiw1qhnki",
    accessToken: "CNRHxwO9a5935BbLaWpzOxx2H1tlUljFg63xxqyEKAs",
  });

  const res = await client.getEntries({ content_type: "recepie" });

  return {
    props: {
      recipes: res.items,
    },
  };
};

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return (
          <div key={recipe.sys.id}>
            <Image
              width={300}
              height={300}
              src={"https:" + recipe.fields.thumbnail.fields.file.url}
            />
            <h2>{recipe.fields.title}</h2>
            <p>Coocking time: {recipe.fields.cookingTime}</p>
            <ul>
              Coocking time:{" "}
              {recipe.fields.ingredients.map((ingred, index) => (
                <li key={index}>{ingred}</li>
              ))}
            </ul>
            <h3>Method:</h3>
            <p>{documentToHtmlString(recipe.fields.method)}</p>
          </div>
        );
      })}
    </div>
  );
}
