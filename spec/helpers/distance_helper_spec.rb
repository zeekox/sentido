require 'spec_helper'


describe DistanceHelper do
  describe "#compute" do

    it "should compute distance with less than 0.2m diff with google map computed value" do
      value = DistanceHelper.compute(4.695625, 48.398152, 4.694424, 48.396328)
      gmaps_value = 221.583

      diff = gmaps_value - value

      diff.abs().should <= 0.25

      value.should eq 221.35479611898023
    end
    it "should compute same inverse distance" do
      one_way = DistanceHelper.compute(4.695625, 48.398152, 4.694424, 48.396328)
      back = DistanceHelper.compute(4.694424, 48.396328, 4.695625, 48.398152)

      one_way.should eq back
    end
    it "should compute zero for same coordinates" do
      DistanceHelper.compute(4.695625, 48.398152, 4.695625, 48.398152).should eq 0
    end
  end

  describe "#compute_total" do
    it "should compute the same as compute for two coordinates" do
      one = [4.6, 48.3]
      two = [4.7, 48.4]

      compute_result = DistanceHelper.compute(one[0], one[1], two[0], two[1])

      compute_total_result = DistanceHelper.compute_total([one, two])

      compute_total_result.should eq compute_result.round(0)
    end

    it "should compute the same as compute for two coordinates" do
      one = [4.6, 48.3]
      two = [4.7, 48.4]

      compute_one_way_result = DistanceHelper.compute_total([one, two])
      compute_one_way_and_return_result = DistanceHelper.compute_total([one, two, one])

      compute_one_way_and_return_result.should eq(compute_one_way_result * 2)
    end

  end
end
