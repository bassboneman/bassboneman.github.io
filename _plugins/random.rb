module Jekyll
  module SampleFilter
    # Use sample to get a random value from an array
    #
    # input - The Array to sample.
    #
    # Examples
    #
    #   random([1, 2, 3, 4, 5])
    #   # => 2
    #
    # Returns a randomly-selected item out of an array.
    def sample(array)
      return array unless array.is_a?(Array)
      array.sample()
    end
  end

  class RandomTag < Liquid::Tag
    def initialize(tag_name, input, tokens)
      super
      # random float from 0 to 1 if no input
      if input == ""
        @random = rand()
      else
        # if input, see if it's one number or two
        array = input.split(" ")
        if array.length == 1
          # if one number, random from 0 to that number
          @random = rand(array[0].to_i)
        elsif array.length == 2
          # otherwise use both numbers as a range
          @random = rand(array[0].to_i...array[1].to_i)
        end
      end
    end

    def render(context)
      "#{@random}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::SampleFilter)

Liquid::Template.register_tag('random', Jekyll::RandomTag)