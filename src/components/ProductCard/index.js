import { formatDate } from '../../utils/date'

export const ProductCard = ({productData}) => {
    console.log(productData)
    return    <div class="col-md-4">
    <div class="card mb-3">
        <img src={productData.imageUrl} class="card-img-top" alt="..." />
        <div class="card-body">
            <div class="row g-4">
                <div class="col">
                    <h5 class="card-title">{productData.title}</h5>
                </div>
                <div class="col">
                    <i class="fa-solid fa-heart text-danger"></i> {productData.likes}
                </div>
            </div>

            <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                esse illum ex totam incidunt ipsam.
            </p>
            <p class="card-text">
                <button class="btn btn-outline-primary">
                    Ver detalhes <i class="fa-solid fa-arrow-right"></i>
                </button>
            </p>
            <p class="card-text fw-bold">Preço: R$ {productData.price / 100}</p>
            <p class="card-text">
                <small class="text-muted"
                >{formatDate(productData.createdAt)}, {productData.state}</small
                >
            </p>
        </div>
    </div>
</div>
}