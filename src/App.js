import { Header } from './components/Header'
import { ProductDetail } from './components/ProductDetail'
import { Question } from './components/Question'
import { Product } from './pages/Product'

const product = {
  owner: 'Jhenny Doe',
  image: 'ryzen2.jpg',
  name: 'Ryzen 3 3200G',
  price: new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format('399'),
  local: 'Rio de Janeiro',
  amount: 320,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
  consequatur commodi nihil, quaerat voluptatum obcaecati. Architecto
  consequuntur quisquam, labore inventore maiores sed nobis asperiores
  unde, mollitia a, distinctio cupiditate velit nemo natus. Rerum
  labore aliquam cum, quasi tenetur, quod reprehenderit quo culpa
  totam, voluptatum temporibus. Earum vero tenetur dolorem vitae.`,
  questions: [
    {
      id: 1,
      questionByUser: 'Felipe Nieto',
      question: 'Qual é o preço?',
      answer: 'O preço é 399,00 R$',
    },
    {
      id: 2,
      questionByUser: 'John Doe',
      question: 'Entrega no Rio de Janeiro?',
      answer: 'Entregamos sim, também é possivel retirar na loja',
    },
  ],
}

function App() {
  return (
    <>
      <div className="container">
        <h1 className="pb-5">Componentizando a aplicação</h1>

        <div className="mt-5 mb-5">
          <h5 className="alert alert-info">
            Componente Header, visto que a barra de navegação está presente em
            todas as páginas:
          </h5>
          <Header />
        </div>

        <div className="mt-5 mb-5">
          <h5 className="alert alert-info">
            Na página de produto existe um componente ProductDetail, apesar de
            apenas existir um componente desse em cada tela de produto, foi
            criado um componente para melhorar a legibilidade do código:
          </h5>
          <ProductDetail product={product} />
        </div>

        <div className="mt-5 mb-5">
          <h5 className="alert alert-info">
            Também dentro da página de um produto existe uma seção de perguntas
            e respostas, como é algo que se repete, é criado o componente
            Question, no qual é passado as informações (props) do componente pai
            (no caso Product) para o componente filho (Question)
          </h5>
          <Question
            user="John Doe"
            question="Isso é um componente?"
            owner="Felipe"
            answer="Sim isso é um componente"
          />
        </div>

        <div className="mt-5 mb-5">
          <h5 className="alert alert-info">
            A página de um produto faz uso desses componentes e também é um
            componente (Product) e faz uso dos componentes citados, destacados
            em vermelho:
          </h5>
          <Product />
        </div>
      </div>
    </>
  )
}

export default App
