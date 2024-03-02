package fr.dawan.springsecurity.generic.filter;

import fr.dawan.springsecurity.generic.GenericController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract class FilterController<D, F, S extends FilterService<D, F>> extends GenericController<D, S> {
    protected FilterController(S service) {
        super(service);
    }

    @GetMapping("/filter")
    public Page<D> findFiltered(@RequestBody F filter, Pageable pageable) {
        return service.findFiltered(filter, pageable);
    }
}
