import { TestBed } from '@angular/core/testing';
import { RegistryService } from './registry.service';

describe('RegistryService', () => {
  let service: RegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with live tools including CompoundCalc and Regex Tester', () => {
    const live = service.liveTools();
    expect(live.length).toBeGreaterThanOrEqual(2);

    const compound = live.find(t => t.id === 'compound-calc');
    expect(compound).toBeDefined();
    expect(compound?.url).toBe('https://compoundcalc.genpoputils.com');
    expect(compound?.status).toBe('live');

    const regex = live.find(t => t.id === 'regex-tester');
    expect(regex).toBeDefined();
    expect(regex?.url).toBe('https://regex.genpoputils.com');
    expect(regex?.status).toBe('live');
  });

  it('should return exactly 7 categories as specified', () => {
    const categories = service.categories();
    expect(categories.length).toBe(7);
    const names = categories.map(c => c.name);
    expect(names).toContain('Finance');
    expect(names).toContain('Developer Tools');
    expect(names).toContain('Math');
    expect(names).toContain('Business');
    expect(names).toContain('Health & Fitness');
    expect(names).toContain('Date & Time');
    expect(names).toContain('Converters');
  });

  it('should find Compound Calculator when searching "compound"', () => {
    service.setSearchQuery('compound');
    const results = service.searchResults();
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].tool.id).toBe('compound-calc');
  });

  it('should find Regex Tester when searching "regex"', () => {
    service.setSearchQuery('regex');
    const results = service.searchResults();
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].tool.id).toBe('regex-tester');
  });

  it('should find Compound Calculator when searching keyword "interest"', () => {
    service.setSearchQuery('interest');
    const results = service.searchResults();
    expect(results.some(r => r.tool.id === 'compound-calc')).toBeTrue();
  });

  it('should find Loan & Mortgage when searching "loan"', () => {
    service.setSearchQuery('loan');
    const results = service.searchResults();
    expect(results.some(r => r.tool.id === 'loan-mortgage')).toBeTrue();
  });

  it('should correctly filter by category', () => {
    service.setSelectedCategory('Finance');
    const filtered = service.filteredTools();
    expect(filtered.every(t => t.category === 'Finance')).toBeTrue();
  });
});
