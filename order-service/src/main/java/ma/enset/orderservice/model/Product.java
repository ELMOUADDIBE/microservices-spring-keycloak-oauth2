package ma.enset.orderservice.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Getter
@Setter
public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;

    public String getName() {
        return this.name;
    }

    public String getId() {
        return id;
    }

    public double getPrice() {
        return price;
    }
}
