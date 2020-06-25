namespace :specs do
  task :tests do
    exec 'bundle exec rspec'
  end
end

desc 'run specs'
task :specs => 'specs:tests'
