package fr.dawan.springsecurity.generic;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public abstract class GenericServiceImpl<
        E extends BaseEntity,
        R extends JpaRepository<E, Long>,
        D,
        M extends GenericMapper<D,E>
        > implements GenericService<D> {

    protected final R repository;
    protected final M mapper;
    protected final ApplicationEventPublisher publisher;
    
    @Override
    public Page<D> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public Optional<D> findById(long id) {
        return repository.findById(id).map(mapper::toDto);
    }


    @Override
    public D saveOrUpdate(D dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Override
    public void deleteById(long id) {
        repository.deleteById(id);
    }

    public D toDto(E entity) {
        return mapper.toDto(entity);
    }

    public List<D> toDto(List<E> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }
}
